function ContactList({ contacts, loading, onView, onEdit, onDelete }) {
  return (
    <div className="contact-list-container">
      {loading && <div className="empty-state">Loading your network...</div>}

      {!loading && contacts.length === 0 && (
        <div className="empty-state">
          <p>No contacts found. Click the plus button below to add one.</p>
        </div>
      )}

      {contacts.map((contact) => {
        const initial = contact.name ? contact.name.charAt(0).toUpperCase() : '?';
        return (
          <div key={contact._id} className="contact-item-row" onClick={() => onView(contact)}>
            <div className="contact-info-left">
              <div className="contact-avatar">{initial}</div>
              <div className="contact-details">
                <h3>{contact.name}</h3>
              </div>
            </div>
            
            <div className="contact-item-actions" onClick={(e) => e.stopPropagation()}>
              <button className="text-action-btn" onClick={() => onEdit(contact)}>
                Edit
              </button>
              <button className="text-action-btn delete" onClick={() => onDelete(contact)}>
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ContactList;