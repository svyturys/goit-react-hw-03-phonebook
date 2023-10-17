import {
  List,
  ListItem,
  ContactCard,
  ButtonDelete,
  ButtonReset,
} from './ContactList.styled';

export const ContactList = ({ onReset, items, onDelete }) => {
  return (
    <List>
      <ButtonReset type="button" onClick={onReset}>
        Reset
      </ButtonReset>
      {items.map(({ id, name, number }) => (
        <ListItem key={id}>
          <ContactCard>
            {name}:&nbsp;<span>{number}</span>
            <ButtonDelete type="button" onClick={() => onDelete(id)}>
              Delete
            </ButtonDelete>
          </ContactCard>
        </ListItem>
      ))}
    </List>
  );
};
