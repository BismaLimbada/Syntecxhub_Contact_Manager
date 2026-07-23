import { useState, useEffect } from 'react';

const emptyForm = { name: '', email: '', phone: '', address: '' };

function ContactForm({ onSave, editingContact, onCancelEdit }) {
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (editingContact) {
      setFormData({
        name: editingContact.name || '',
        email: editingContact.email || '',
        phone: editingContact.phone || '',
        address: editingContact.address || '',
      });
    } else {
      setFormData(emptyForm);
    }
    setErrors({});
  }, [editingContact]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await onSave(formData, editingContact?._id);
      setFormData(emptyForm);
      setErrors({});
    } catch (err) {
      setErrors({ form: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h2>{editingContact ? 'Edit Contact' : 'Add New Contact'}</h2>

      {errors.form && <p className="error-banner">{errors.form}</p>}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
        {errors.email && <span className="field-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+92 300 1234567" />
        {errors.phone && <span className="field-error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Optional" />
        {errors.address && <span className="field-error">{errors.address}</span>}
      </div>

      <div className="form-actions">
        <button type="submit" disabled={submitting}>
          {submitting ? 'Saving...' : editingContact ? 'Update Contact' : 'Add Contact'}
        </button>
        {editingContact && (
          <button type="button" className="btn-secondary" onClick={onCancelEdit}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ContactForm;
