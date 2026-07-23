import { useState, useEffect } from 'react';

const emptyForm = { name: '', email: '', phone: '', address: '' };

function ContactForm({ onSave, editingContact, onCancel }) {
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
      newErrors.email = 'Valid email required';
    }
    if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Valid phone required';
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
    } catch (err) {
      setErrors({ form: err.message });
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.form && <div className="global-error">{errors.form}</div>}

      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
        {errors.name && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.name}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" />
        {errors.email && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.email}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
        {errors.phone && <div style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '4px' }}>{errors.phone}</div>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address (Optional)</label>
        <textarea id="address" name="address" value={formData.address} onChange={handleChange} placeholder="Street, City" />
      </div>

      <div className="modal-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Saving...' : 'Save Contact'}
        </button>
      </div>
    </form>
  );
}

export default ContactForm;