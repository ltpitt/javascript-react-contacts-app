import propTypes from "prop-types";
import { useState } from "react";

const ListContacts = ({ contacts, onDeleteContact }) => {
  const [query, setQuery] = useState("");

  const updateQuery = (query) => {
    setQuery(query.trim());
  };

  const clearQuery = () => {
    setQuery("");
  };

  const showingContacts =
    query === ""
      ? contacts
      : contacts.filter((c) =>
          c.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="list-contacts">
      <input
        className="search-contacts"
        type="text"
        placeholder="Search Contacts"
        value={query}
        onChange={(event) => updateQuery(event.target.value)}
      />

      {showingContacts.length !== contacts.length && (
        <div className="showing-contacts">
          <span>
            Now showing {showingContacts.length} of {contacts.length}
          </span>
          <button onClick={clearQuery}>Show all</button>
        </div>
      )}

      <ol className="contact-list">
        {showingContacts.map((contact) => {
          return (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{
                  backgroundImage: `url(${contact.avatarURL})`,
                }}
              ></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

ListContacts.propTypes = {
  contacts: propTypes.array.isRequired,
  onDeleteContact: propTypes.func,
};

export default ListContacts;
