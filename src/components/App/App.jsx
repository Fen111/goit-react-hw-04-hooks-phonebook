import { nanoid } from 'nanoid';
import React, { Component } from 'react';

import Container from '../Container/Container';
import ContactForm from 'components/ContactForm';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import contactsUser from '../../data/contacts.json';

export default class App extends Component {
  state = {
    contacts: contactsUser,
    filter: '',
  };

  formSubmitHandler = data => {
    const { contacts } = this.state;
    const newContact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    if (contacts.some(({ name }) => name === newContact.name)) {
      alert(`${newContact.name} is already in contacts!`);
      return;
    } else if (contacts.some(({ number }) => number === newContact.number)) {
      alert(`${newContact.number} is already in contacts!`);
      return;
    }
    this.setState(({ contacts }) => ({
      contacts: [newContact, ...contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const lowerCaseFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(lowerCaseFilter),
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;

    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </Container>
    );
  }
}
