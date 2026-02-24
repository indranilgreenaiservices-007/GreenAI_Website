import json
import os
from pymongo import MongoClient, UpdateOne
from dotenv import load_dotenv

load_dotenv()

def migrate_to_null_schema():
    try:
        # 1. Connect to Atlas
        client = MongoClient(os.getenv("MONGO_URI"))
        db = client['test'] # Ensure this matches your DB name
        users_col = db.users
        print(f"✅ Connected to DB: {db.name}")

        # 2. DROP THE UNIQUE INDEXES
        # We MUST do this because Unique indexes forbid multiple 'null' values
        print("Removing unique constraints to allow uniform 'null' fields...")
        try:
            users_col.drop_index("googleId_1")
            users_col.drop_index("facebookId_1")
            print("🗑️ Unique indexes removed.")
        except Exception:
            print("ℹ️ No unique indexes found to drop.")

        # 3. LOAD DATA FROM JSON
        json_file = 'greenai.users.json'
        if not os.path.exists(json_file):
            print(f"❌ File {json_file} not found!")
            return

        with open(json_file, 'r', encoding='utf-8') as f:
            users_data = json.load(f)

        print(f"Syncing {len(users_data)} users...")

        operations = []
        for data in users_data:
            email = data.get('email')
            if not email: continue

            # Create the document exactly as you want it to look
            # Every field is either from JSON or explicitly 'None' (null in Mongo)
            update_doc = {
                "name": data.get('name', 'Unknown'),
                "password": data.get('password'),
                "phone": data.get('phone', None),
                "organizationName": data.get('organizationName', None),
                "designation": data.get('designation', None),
                "sector": data.get('sector', None),
                "role": data.get('role', 'client'),
                "isVerified": data.get('isVerified', False),
                "isActive": data.get('isActive', True),
                
                # FORCING THE NULL LOOK:
                "googleId": data.get('googleId', None),
                "facebookId": data.get('facebookId', None)
            }

            # Update existing user or create new one
            operations.append(
                UpdateOne({"email": email}, {"$set": update_doc}, upsert=True)
            )

        # 4. EXECUTE BULK WRITE
        if operations:
            result = users_col.bulk_write(operations)
            print(f"✅ Sync Complete!")
            print(f"   - Matched/Updated: {result.matched_count}")
            print(f"   - New Users: {result.upserted_count}")

        # 5. VERIFY REMAINING USERS
        # This catches any users ALREADY in your DB that weren't in the JSON
        # and forces them to have null IDs too.
        users_col.update_many({"googleId": {"$exists": False}}, {"$set": {"googleId": None}})
        users_col.update_many({"facebookId": {"$exists": False}}, {"$set": {"facebookId": None}})
        
        print("\n✨ Success! Every user in the DB now has googleId and facebookId visible.")
        print("📝 Note: Unique indexes were removed to allow this.")

    except Exception as e:
        print(f"❌ Fatal Error: {e}")

if __name__ == "__main__":
    migrate_to_null_schema()