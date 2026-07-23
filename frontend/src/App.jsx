import { useState, useEffect, useCallback } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { getContacts, createContact, updateContact, deleteContact } from './api/contactApi';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingContact, setEditingContact] = useState(null);
  const [search, setSearch] = useState('');

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
    }, 300); // debounce search
    return () => clearTimeout(timer);
  }, [search, fetchContacts]);

  const handleSave = async (formData, id) => {
    if (id) {
      const updated = await updateContact(id, formData);
      setContacts((prev) => prev.map((c) => (c._id === id ? updated : c)));
      setEditingContact(null);
    } else {
      const created = await createContact(formData);
      setContacts((prev) => [created, ...prev]);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await deleteContact(id);
      setContacts((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>📇 Contact Manager</h1>
      </header>

      {error && <p className="error-banner global-error">{error}</p>}

      <main className="app-main">
        <ContactForm
          onSave={handleSave}
          editingContact={editingContact}
          onCancelEdit={() => setEditingContact(null)}
        />
        <ContactList
          contacts={contacts}
          loading={loading}
          onEdit={setEditingContact}
          onDelete={handleDelete}
          search={search}
          onSearchChange={setSearch}
        />
      </main>
    </div>
  );
}

export default App;
