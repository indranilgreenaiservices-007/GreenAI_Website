import json
import os
from pymongo import MongoClient, UpdateOne
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

def restore_timestamps_by_email():
    try:
        client = MongoClient(os.getenv("MONGO_URI"))
        db = client['test'] 
        users_col = db.users
        print(f"✅ Connected to: {db.name}")

        json_file = 'greenai.users.json'
        if not os.path.exists(json_file):
            print(f"❌ File {json_file} not found!")
            return

        with open(json_file, 'r', encoding='utf-8') as f:
            users_data = json.load(f)

        print(f"🔄 Matching {len(users_data)} users by Email to restore dates...")

        operations = []
        for entry in users_data:
            email = entry.get('email')
            
            # Extract dates from Extended JSON format
            raw_created = entry.get('createdAt', {}).get('$date')
            raw_updated = entry.get('updatedAt', {}).get('$date')

            if email and raw_created:
                # Convert ISO strings to datetime objects
                # Replace 'Z' with UTC offset for Python compatibility
                created_date = datetime.fromisoformat(raw_created.replace("Z", "+00:00"))
                
                update_fields = {"createdAt": created_date}
                
                if raw_updated:
                    updated_date = datetime.fromisoformat(raw_updated.replace("Z", "+00:00"))
                    update_fields["updatedAt"] = updated_date

                # Find by EMAIL instead of ID
                operations.append(
                    UpdateOne(
                        {"email": email}, 
                        {"$set": update_fields}
                    )
                )

        if operations:
            result = users_col.bulk_write(operations)
            print(f"✨ Success!")
            print(f"   - Users matched/checked: {result.matched_count}")
            print(f"   - Timestamps updated: {result.modified_count}")
        else:
            print("⚠️ No valid data found in JSON.")

    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    restore_timestamps_by_email()