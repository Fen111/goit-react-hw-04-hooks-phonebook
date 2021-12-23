import s from './Filter.module.css';

export default function Filter({ value, onChange }) {
  return (
    <div className={s.filterWrapper}>
      <label className={s.label}>
        Find contacts by name
        <input
          className={s.input}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </div>
  );
}
