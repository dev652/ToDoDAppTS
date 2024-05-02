/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useState } from 'react';
import Navigation from '../components/Navigation';
import { BallTriangle } from 'react-loader-spinner'


interface UpdateTaskProps {
  state: {
    contract: any;
    account: string;
  };
}

const UpdateTask: FC<UpdateTaskProps> = ({ state }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isLoading,setIsLoading]=useState<boolean>(false);


  const closeModal = (): void => {
    setModalVisible(false);
    setModalContent('');
  };

  const { contract, account } = state;

  const updateTask = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const taskNameElement = document.querySelector<HTMLInputElement>('#taskName');
    const taskDateElement = document.querySelector<HTMLInputElement>('#taskDate');
    const taskIDElement = document.querySelector<HTMLInputElement>('#taskID');
    
    if (taskNameElement && taskDateElement && taskIDElement) {
      const taskName = taskNameElement.value;
      const taskDate = taskDateElement.value;
      const taskID = taskIDElement.value;
  
    try {
      const res = await fetch('http://localhost:3000/api/ethereum/update-task', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ taskDate: taskDate }),
      });
      const data = await res.json();
      if (data.status === 200) {
        setIsLoading(true)
        await contract.methods.updateTask(taskID, taskName, taskDate).send({ from: account });
        setModalContent(`Task ID ${taskID} updated with task name ${taskName} and date ${taskDate}`);
        setModalVisible(true);
        setIsLoading(false)

      } else {
        throw new Error('Task cannot be updated because of date clash');
      }
    } catch (error) {
      setModalContent('Task cannot be updated');
      setIsLoading(false)
      setModalVisible(true);
    }
  }
  };

  return (
    <>
      <Navigation />
      <div className="update_task todo_btn">
        <form onSubmit={updateTask}>
          <label>
            ID:
            <input id="taskID" />
          </label>
          <label>
            Name:
            <input id="taskName" />
          </label>
          <label>
            Date:
            <input id="taskDate" type="date" />
          </label>
          <button type="submit">Update Task</button>
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

export default UpdateTask;