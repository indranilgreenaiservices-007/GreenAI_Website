
const Job = require('../models/Job');
const Application = require('../models/Application');
const Employee = require('../models/Employee');
const Permission = require('../models/Permission');

// --- JOBS ---
exports.getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createJob = async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json(job);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- APPLICATIONS ---
exports.getApplications = async (req, res) => {
    try {
        // Populate job title if needed, but for now we stored string
        const apps = await Application.find().sort({ appliedAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateApplication = async (req, res) => {
    try {
        const app = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!app) return res.status(404).json({ error: 'Application not found' });
        res.json(app);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createApplication = async (req, res) => {
    try {
        const application = new Application(req.body);
        await application.save();
        res.status(201).json({ message: 'Application submitted successfully', application });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const nodemailer = require('nodemailer');

exports.sendInterviewMail = async (req, res) => {
    try {
        const { applicantId, date, time, mode, link, email, fullName, jobTitle } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.HR_EMAIL, // Updated to use HR_EMAIL
                pass: process.env.HR_EMAIL_PASSWORD
            }
        });

        const cleanLink = link ? link.trim() : "";
        const isVirtual = mode === 'Virtual';

        const linkRow = (isVirtual && cleanLink)
            ? `<tr>
          <td style="padding: 8px 0; color: #374151; font-size: 15px;"><strong>Meeting Link:</strong></td>
          <td style="padding: 8px 0; color: #111827; font-size: 15px; text-align: right;">
            <a href="${cleanLink}" style="color: #059669; font-weight: bold; text-decoration: none;">Join Meeting</a>
          </td>
         </tr>`
            : '';

        const mailOptions = {
            from: `"GreenAI HR Team" <${process.env.HR_EMAIL}>`,
            to: email,
            subject: `Interview Invitation: ${jobTitle} | GreenAI Services Pvt. Ltd.`,
            html: `
        <div style="background-color: #f9fafb; padding: 40px 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); border: 1px solid #e5e7eb;">
            <div style="background-color: #059669; height: 6px;"></div>
            <div style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 24px; font-weight: 700;">Interview Invitation</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Dear <strong>${fullName}</strong>,</p>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">Thank you for your interest in <strong>GreenAI Services Pvt. Ltd.</strong> We are pleased to invite you for the next round of our selection process for the <strong>${jobTitle}</strong> position.</p>

              <div style="background-color: #f0fdf4; border: 1px solid #dcfce7; border-radius: 12px; padding: 24px; margin: 32px 0;">
                <h3 style="margin: 0 0 16px 0; color: #065f46; font-size: 14px; font-weight: 700; text-transform: uppercase;">Schedule Details</h3>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Date:</strong></td>
                    <td style="padding: 8px 0; color: #111827; text-align: right;">${date}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Time:</strong></td>
                    <td style="padding: 8px 0; color: #111827; text-align: right;">${time}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #374151;"><strong>Format:</strong></td>
                    <td style="padding: 8px 0; color: #111827; text-align: right;">${isVirtual ? 'Virtual Video Conference' : 'On-site Interview'}</td>
                  </tr>
                  ${linkRow}
                </table>
              </div>

              <p style="color: #4b5563; font-size: 15px;">Please reply to this email to confirm your availability. We look forward to meeting you.</p>

              <div style="border-top: 1px solid #e5e7eb; padding-top: 24px; margin-top: 32px;">
                <p style="margin: 0; color: #111827; font-weight: 600;">Best regards,</p>
                <p style="margin: 4px 0 0 0; color: #6b7280; font-size: 14px;">HR Talent Acquisition Team<br>GreenAI Services Pvt. Ltd.</p>
              </div>
            </div>
          </div>
        </div>`
        };

        // Send email first
        await transporter.sendMail(mailOptions);

        // Update DB status - using findByIdAndUpdate for efficiency
        const app = await Application.findByIdAndUpdate(applicantId, {
            mailSent: true,
            interviewDate: date,
            interviewTime: time,
            mode: mode,
            link: cleanLink,
            status: 'Interviewing'
        }, { new: true });

        if (!app) return res.status(404).json({ error: 'Applicant not found' });

        res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Mailing Error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
};


// --- EMPLOYEES ---
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().sort({ name: 1 });
        res.json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.createEmployee = async (req, res) => {
    try {
        const { Id, email } = req.body;
        // Check duplicates
        const existing = await Employee.findOne({ $or: [{ Id }, { email }] });
        if (existing) return res.status(400).json({ error: 'Employee with this ID or Email already exists' });

        const emp = new Employee(req.body);
        await emp.save();
        res.status(201).json(emp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!emp) return res.status(404).json({ error: 'Employee not found' });
        res.json(emp);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteEmployee = async (req, res) => {
    try {
        const emp = await Employee.findByIdAndDelete(req.params.id);
        if (!emp) return res.status(404).json({ error: 'Employee not found' });
        res.json({ message: 'Employee deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// --- PERMISSIONS ---
exports.getPermissions = async (req, res) => {
    try {
        const perms = await Permission.find().sort({ createdAt: -1 });
        res.json(perms);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.grantAccess = async (req, res) => {
    try {
        const { email, expiresAt } = req.body;

        // Check if exists
        let perm = await Permission.findOne({ email });
        if (perm) {
            perm.expiresAt = expiresAt;
            await perm.save();
        } else {
            perm = new Permission({ email, expiresAt });
            await perm.save();
        }

        res.json(perm);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.revokeAccess = async (req, res) => {
    try {
        await Permission.findByIdAndDelete(req.params.id);
        res.json({ message: 'Access revoked' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
