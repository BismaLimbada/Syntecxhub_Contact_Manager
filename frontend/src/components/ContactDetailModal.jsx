function ContactDetailModal({ contact, onClose, onEdit, onDelete }) {
  if (!contact) return null;
  const initial = contact.name ? contact.name.charAt(0).toUpperCase() : '?';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Contact Details</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <div className="detail-profile-section">
          <div className="detail-avatar">{initial}</div>
          <h3 className="detail-name">{contact.name}</h3>
        </div>

        <div className="detail-fields-list">
          <div className="detail-field-item">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">{contact.email}</span>
          </div>
          <div className="detail-field-item">
            <span className="detail-label">Phone Number</span>
            <span className="detail-value">{contact.phone}</span>
          </div>
          {contact.address && (
            <div className="detail-field-item">
              <span className="detail-label">Address</span>
              <span className="detail-value">{contact.address}</span>
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn btn-secondary" onClick={() => { onClose(); onEdit(contact); }}>
            Edit Contact
          </button>
          <button type="button" className="btn btn-danger" onClick={() => { onClose(); onDelete(contact); }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContactDetailModal;