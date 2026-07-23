import ContactItem from './ContactItem';

function ContactList({ contacts, loading, onEdit, onDelete, search, onSearchChange }) {
  return (
    <div className="contact-list">
      <div className="list-header">
        <h2>Contacts ({contacts.length})</h2>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {loading && <p>Loading contacts...</p>}

      {!loading && contacts.length === 0 && <p className="empty-state">No contacts found. Add one to get started!</p>}

      <div className="contact-grid">
        {contacts.map((contact) => (
          <ContactItem key={contact._id} contact={contact} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
}

export default ContactList;
