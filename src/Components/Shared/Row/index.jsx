import Button from '../Button';
import styles from './row.module.css';

const Row = ({ data, headers, handleDelete, editItem, handleRelatedEntity }) => {
  const fixDate = (date) => {
    return date.slice(0, 10);
  };

  return (
    <tr className={styles.row} key={data._id}>
      {headers.map((header, index) => {
        if (header === 'actions') {
          return (
            <td key={index}>
              <Button onClick={() => editItem(data._id)} text="Edit" variant="editButton" />
              <Button
                onClick={() => {
                  handleDelete(data._id);
                }}
                text="Delete"
                variant="confirmButton"
              />
            </td>
          );
        }
        if (header.includes('updatedAt' || 'Date' || 'date'))
          return <td key={index}>{fixDate(data[header])}</td>;
        if (header === 'status') return <td key={index}>{data[header] ? 'Active' : 'Inactive'}</td>;
        if (header.includes('Date') && data[header])
          return <td key={index}>{fixDate(data[header])}</td>;
        if (Array.isArray(data[header])) {
          return (
            <td key={index}>
              <Button
                onClick={() => {
                  handleRelatedEntity(data[header]);
                }}
                text={header}
              />
            </td>
          );
        } else {
          return (
            <td className={styles.td} key={index}>
              {data[header]}
            </td>
          );
        }
      })}
    </tr>
  );
};

export default Row;
