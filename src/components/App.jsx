import { ContactForm } from './ContactForm/ContactForm';
import { ContactsBook } from './App.staled';
import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

const startContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

export class App extends Component {
  state = {
    contacts: startContacts,
    filter: '',
  };

  componentDidMount() {
    const saveContacts = localStorage.getItem('current-contacts');
    if (saveContacts !== null) {
      this.setState({
        contacts: JSON.parse(saveContacts),
      });
    }
  }

  componentDidUpdate(_, prevSate) {
    const { contacts: prevContacts } = prevSate;
    const { contacts: currentContacts } = this.state;

    if (prevContacts.length !== currentContacts.length) {
      localStorage.setItem('current-contacts', JSON.stringify(currentContacts));
    }
  }

  handleAddContact = newContact => {
    const { contacts } = this.state;

    contacts.find(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${newContact.name} is already in contacts`)
      : this.setState(prevState => {
          return { contacts: [...prevState.contacts, newContact] };
        });
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  handleChangeNameFilter = newName => {
    this.setState({
      filter: newName,
    });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  resetContacts = () => {
    window.confirm(
      'Are you sure you want to return Contacts to their starting positions?'
    ) &&
      this.setState({
        contacts: startContacts,
      });
  };

  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();

    return (
      <ContactsBook>
        <h1>Phonebook</h1>
        <ContactForm onAdd={this.handleAddContact} />

        <h2>Contacts</h2>
        <Filter nameFilter={filter} onChange={this.handleChangeNameFilter} />
        <ContactList
          onReset={this.resetContacts}
          items={visibleContact}
          onDelete={this.deleteContact}
        />
      </ContactsBook>
    );
  }
}
