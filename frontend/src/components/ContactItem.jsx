function ContactItem({ contact, onEdit, onDelete }) {
  return (
    <div className="contact-card">
      <div className="contact-info">
        <h3>{contact.name}</h3>
        <p>{contact.email}</p>
        <p>{contact.phone}</p>
        {contact.address && <p className="address">{contact.address}</p>}
      </div>
      <div className="contact-actions">
        <button onClick={() => onEdit(contact)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(contact._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default ContactItem;
