
const express = require('express');
const router = express.Router();
const hrController = require('../controllers/hrController');
const { protect } = require('../middleware/authMiddleware');

// Public Routes (No Auth Required)
router.get('/jobs', hrController.getJobs);
router.post('/applications', hrController.createApplication);

// Protect all subsequent HR routes
router.use(protect);

// Jobs (Protected Management)
router.post('/jobs', hrController.createJob);
router.put('/jobs/:id', hrController.updateJob);
router.delete('/jobs/:id', hrController.deleteJob);

// Applications
router.get('/applications', hrController.getApplications);
router.patch('/applications/:id', hrController.updateApplication);
router.post('/send-interview-mail', hrController.sendInterviewMail);

// Employees
router.get('/employees', hrController.getEmployees);
router.post('/employees', hrController.createEmployee);
router.put('/employees/:id', hrController.updateEmployee);
router.delete('/employees/:id', hrController.deleteEmployee);

// Permissions
router.get('/permissions', hrController.getPermissions);
router.post('/grant-access', hrController.grantAccess);
router.delete('/permissions/:id', hrController.revokeAccess);

module.exports = router;
