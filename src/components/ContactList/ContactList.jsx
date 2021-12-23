import PropTypes from 'prop-types';
import ContactListItem from 'components/ContactListItem';
import s from './ContactList.module.css';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={s.listItem} key={id}>
          <ContactListItem
            name={name}
            number={number}
            id={id}
            onDeleteContact={onDeleteContact}
          />
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number,
};
