import PropTypes from 'prop-types';
import s from './ContactListItem.module.css';

export default function ContactListItem({ name, number, id, onDeleteContact }) {
  return (
    <>
      <p className={s.text}>
        {name}: {number}
      </p>
      <button
        className={s.itemButton}
        type="button"
        onClick={() => onDeleteContact(id)}
      >
        delete
      </button>
    </>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
};
