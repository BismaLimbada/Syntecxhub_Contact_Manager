import { useState, useEffect, useCallback } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import ContactDetailModal from './components/ContactDetailModal';
import DeleteModal from './components/DeleteModal';
import { getContacts, createContact, updateContact, deleteContact } from './api/contactApi';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  
  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [viewingContact, setViewingContact] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);

  const fetchContacts = useCallback(async (searchTerm = '') => {
    setLoading(true);
    setError('');
    try {
      const data = await getContacts(searchTerm);
      setContacts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchContacts(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search, fetchContacts]);

  const handleOpenAdd = () => {
    setEditingContact(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (contact) => {
    setEditingContact(contact);
    setIsFormOpen(true);
  };

  const handleSave = async (formData, id) => {
    if (id) {
      const updated = await updateContact(id, formData);
      setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
    } else {
      const created = await createContact(formData);
      setContacts((prev) => [created, ...prev]);
    }
    setIsFormOpen(false);
    setEditingContact(null);
  };

  const confirmDelete = async () => {
    if (!contactToDelete) return;
    try {
      await deleteContact(contactToDelete._id);
      setContacts((prev) => prev.filter((c) => c._id !== contactToDelete._id));
      setContactToDelete(null);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Contacts</h1>
      </header>

      {error && <div className="global-error">{error}</div>}

      <div className="toolbar">
        <input
          type="text"
          className="search-input"
          placeholder="Search contacts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ContactList
        contacts={contacts}
        loading={loading}
        onView={(contact) => setViewingContact(contact)}
        onEdit={handleOpenEdit}
        onDelete={(contact) => setContactToDelete(contact)}
      />

      {/* Floating Add Button */}
      <button className="fab" onClick={handleOpenAdd} title="Add Contact">
        +
      </button>

      {/* Add/Edit Modal Popup */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingContact ? 'Edit Contact' : 'New Contact'}</h2>
              <button className="close-btn" onClick={() => setIsFormOpen(false)}>&times;</button>
            </div>
            <ContactForm
              onSave={handleSave}
              editingContact={editingContact}
              onCancel={() => setIsFormOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Contact Details View Modal */}
      {viewingContact && (
        <ContactDetailModal
          contact={viewingContact}
          onClose={() => setViewingContact(null)}
          onEdit={handleOpenEdit}
          onDelete={(contact) => setContactToDelete(contact)}
        />
      )}

      {/* Custom Delete Confirmation Modal */}
      {contactToDelete && (
        <DeleteModal
          contactName={contactToDelete.name}
          onConfirm={confirmDelete}
          onCancel={() => setContactToDelete(null)}
        />
      )}
    </div>
  );
}

export default App;