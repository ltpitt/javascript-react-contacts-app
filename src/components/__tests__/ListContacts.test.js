import { render, fireEvent, within } from "@testing-library/react";
import ListContacts from "../ListContacts";
import "@testing-library/jest-dom";

const contacts = [
  {
    id: "1",
    name: "John Doe",
    handle: "@johndoe",
    avatarURL: "http://example.com/john.jpg",
  },
  {
    id: "2",
    name: "Jane Doe",
    handle: "@janedoe",
    avatarURL: "http://example.com/jane.jpg",
  },
];

const onDeleteContact = jest.fn();

test("renders ListContacts", () => {
  const { getByText } = render(
    <ListContacts contacts={contacts} onDeleteContact={onDeleteContact} />
  );
  expect(getByText("John Doe")).toBeInTheDocument();
  expect(getByText("Jane Doe")).toBeInTheDocument();
});

test("searches contacts correctly", () => {
  const { getByText, getByPlaceholderText } = render(
    <ListContacts contacts={contacts} onDeleteContact={onDeleteContact} />
  );
  const searchInput = getByPlaceholderText("Search Contacts");
  fireEvent.change(searchInput, { target: { value: "John" } });
  expect(getByText("John Doe")).toBeInTheDocument();
  expect(getByText("Now showing 1 of 2")).toBeInTheDocument();
});

test("clears search correctly", () => {
  const { getByText, getByPlaceholderText } = render(
    <ListContacts contacts={contacts} onDeleteContact={onDeleteContact} />
  );
  const searchInput = getByPlaceholderText("Search Contacts");
  fireEvent.change(searchInput, { target: { value: "John" } });
  fireEvent.click(getByText("Show all"));
  expect(getByText("John Doe")).toBeInTheDocument();
  expect(getByText("Jane Doe")).toBeInTheDocument();
});

test("deletes contact correctly", () => {
  const { getByText } = render(
    <ListContacts contacts={contacts} onDeleteContact={onDeleteContact} />
  );
  const johnDoe = getByText("John Doe");
  const removeButton =
    johnDoe.parentElement.parentElement.querySelector(".contact-remove");
  fireEvent.click(removeButton);
  expect(onDeleteContact).toHaveBeenCalledTimes(1);
});
