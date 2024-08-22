import { FaSpinner } from 'react-icons/fa';

import styles from './index.module.scss';

export default function PageLoading() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <span>
          <FaSpinner className={'animate-spin'} />
        </span>
        <span className={'inline-block ml-3'}>Loading Page...</span>
      </div>
    </div>
  );
}
