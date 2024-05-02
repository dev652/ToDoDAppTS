/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import Navigation from '../components/Navigation';
import { BallTriangle } from 'react-loader-spinner'

interface DeleteTaskProps {
  state: {
    contract: any;
    account: string;
  };
}

const DeleteTask: FC<DeleteTaskProps> = ({ state }) => {
  const [task, setTask] = useState<{ numId: number | null; name: string | null; date: string | null }>({
    numId: null,
    name: null,
    date: null,
  });
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const [isLoading,setIsLoading]=useState<boolean>(false);


  const { contract, account } = state;

  const deleteTask = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
    
      event.preventDefault();
      const taskID = (document.querySelector('#taskID') as HTMLInputElement).value;
      const res = await fetch(`http://localhost:3000/api/ethereum/delete-task/${taskID}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      if (data.status === 200) {
        console.log(data);
        if (contract && contract.methods) {
          setIsLoading(true)
          await contract.methods.deleteTask(taskID).send({ from: account });
          setModalContent(data.message);
          setModalVisible(true);
        }
      } else {
        throw new Error();
      }
    } catch (error ) {

      if (error instanceof Error) {
        setModalContent(error.message);
      } else {
        setModalContent("An unknown error occurred.");
      }
    }
    finally{
      setIsLoading(false);

    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent('');
  };

  return (
    <>
      <Navigation />
      <div className="view_task todo_btn">
        {task.numId !== null && task.name !== null && task.date !== null ? (
          <div className="view_task_by_id  view_all_tasks_card">
            <p>Task ID: {task.numId}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
        <form onSubmit={deleteTask}>
          <label>
            ID:
            <input id="taskID" />
          </label>
          <button type="submit">Delete Task</button>
          <BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#eb5429"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={isLoading}
        />
        </form>
        {modalVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <p>{modalContent}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DeleteTask;