import axios from 'axios';

const API = axios.create({ baseURL: 'https://raahee-server.eastus.cloudapp.azure.com' });
// const API = axios.create({ baseURL: 'http://localhost:1337' });
API.interceptors.request.use((req) => {
  if (JSON.parse(localStorage.getItem('profile'))?.jwt) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).jwt}`;
  }
  return req;
});

// User Auth API
export const signIn = (profile) => API.post('/auth/local', profile);
export const signUp = (profile) => API.post('/auth/local/register', profile);
export const sendEmailVerification = (emailId) => API.post('/auth/send-email-confirmation', { email: emailId, url: 'https://raahee-server.eastus.cloudapp.azure.com/admin/plugins/users-permissions/auth/send-email-confirmation' });
export const forgotPassword = (email) => API.post('/auth/forgot-password', { email: email, url: 'https://raahee-server.eastus.cloudapp.azure.com/admin/plugins/users-permissions/auth/reset-password' });
export const resetPassword = (password, confirmPassword, code) => API.post('/auth/reset-password', { password: password, passwordConfirmation: confirmPassword, code: code });
export const updateProfile = (data) => API.put('/services/edit-user', data);
export const googleSignIn = (search) => API.get(`/auth/google/callback?${search}`);

// Blogs API
export const fetchBlogs = () => API.get('/blogs?_sort=createdAt:DESC');
export const fetchBlogsbyCategory = () => API.get('/blogs?_sort=category:DESC');
export const createBlog = (newBlog) => API.post('/blogs', newBlog);
export const fetchBlogById = (blogId) => API.get(`/blogs/${blogId}`);
export const likeBlog = (blogId, likedBy) => API.put(`/blogs/${blogId}`, { likes: likedBy });
export const updateBlog = (blogId, updatedBlog) => API.put(`/blogs/${blogId}`, updatedBlog);
export const deleteBlog = (blogId) => API.delete(`/blogs/${blogId}`);

// Events API
export const fetchEvents = () => API.get('/events');
export const fetchEventById = (eventId) => API.get(`/events/${eventId}`);
export const fetchEventFeedbackById = (eventId) => API.get(`/event-feedbacks?event=${eventId}&_sort=createdAt:DESC`);
export const createEventFeedback = (eventFeedback) => API.post('/event-feedbacks', eventFeedback);
export const deleteEventFeedback = (eventFeedbackId) => API.delete(`/event-feedbacks/${eventFeedbackId}`);
export const attendEvent = (eventId) => API.put(`/events/${eventId}/attend`);
export const unattendEvent = (eventId) => API.put(`/events/${eventId}/unattend`);
export const createEvent = (event) => API.post('/events', event);
export const updateEvent = (eventId, updatedEvent) => API.put(`/events/${eventId}`, updatedEvent);
export const deleteEvent = (eventId) => API.delete(`/events/${eventId}`);

// MHP API
export const fetchMhps = () => API.get('/services/mhp-search?verificationStage=verified&_sort=experience:DESC');
export const fetchMhpById = (id) => API.get(`/services/mhp-search?id=${id}`);
export const fetchMhpFeedbackById = (mhpId) => API.get(`/therapist-feedbacks?mhp=${mhpId}&_sort=createdAt:DESC`);
export const deleteMhpFeedback = (mhpFeedbackId) => API.delete(`/therapist-feedbacks/${mhpFeedbackId}`);
export const createMhpFeedback = (mhpFeedback) => API.post('/therapist-feedbacks', mhpFeedback);
export const fetchMhpWorkExp = (mhpId) => API.get(`/therapist-workExp?mhp=${mhpId}&_sort=startDateTime:DESC`);
export const fetchMhpSchedule = (mhpId) => API.get(`/appointment-schedules?mhp=${mhpId}&_sort=startTime:DESC`);

// Therapy Terms API
export const fetchTherapyTerms = () => API.get('/therapy-terms');
export const updateCancellationPolicy = (id, value) => API.put(`/therapy-terms/${id}`, { cancellationPolicy: value });
export const updateConfidentiality = (id, value) => API.put(`/therapy-terms/${id}`, { confidentiality: value });
export const updateMainTerms = (id, value) => API.put(`/therapy-terms/${id}`, { mainTerms: value });

// Thoughts API
export const fetchThoughts = (userId) => API.get(`/thoughts?user=${userId}?_sort=createdAt:DESC`);
export const fetchThoughtsInPages = (userId, limit, start) => API.get(`/thoughts?user=${userId}&_start=${start}&_limit=${limit}&_sort=createdAt:DESC`);
export const createThought = (thought) => API.post('/thoughts', thought);
export const deleteUserThought = (thoughtId) => API.delete(`/thoughts/${thoughtId}`);

// Therapy Schedule API
export const fetchSchedule = (userId) => API.get(`/appointment-schedules?user=${userId}&_sort=startTime:DESC`);
export const scheduleAppointment = (scheduleId, reschedule) => API.put(`/appointment-schedules/book-appointment/${scheduleId}`, { rescheduledByClient: reschedule });
export const rescheduleAppointment = (scheduleId) => API.put(`/appointment-schedules/reschedule/${scheduleId}`);

// Upload File
export const uploadFile = (file) => API.post('/upload', file);

// Send Emails
export const sendEmail = (emailData) => API.post('/emails', emailData);
