import Row from '../Row';
import styles from './table.module.css';

const Table = ({ headers, data, handleDelete, editItem, showInfo, handleRelatedEntity }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item) => {
            return (
              <Row
                key={item._id}
                data={item}
                headers={headers}
                handleDelete={handleDelete}
                editItem={editItem}
                showInfo={showInfo}
                handleRelatedEntity={handleRelatedEntity}
              />
            );
          })
        ) : (
          <p className={styles.noData}>There is no data available</p>
        )}
      </tbody>
    </table>
  );
};

export default Table;
