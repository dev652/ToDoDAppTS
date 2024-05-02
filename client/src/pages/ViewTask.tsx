import React, { useState, FC } from 'react';
import Navigation from '../components/Navigation';
import { BallTriangle } from 'react-loader-spinner'


interface Task {
  numId: number | null;
  name: string | null;
  date: string | null;
}

const ViewTask: FC = () => {
  const [task, setTask] = useState<Task>({ numId: null, name: null, date: null });
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isLoading,setIsLoading]=useState<boolean>(false);


  const viewTask = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const taskID = document.querySelector<HTMLInputElement>('#taskID')?.value;
      setIsLoading(true)
      const res = await fetch(`http://localhost:3000/api/ethereum/view-task/${taskID}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      });
      const data = await res.json();
      
      if (data.status === 200) {
        console.log(data.taskObj);
        setTask(data.taskObj);
      } else {
        throw new Error();
      }
    } catch (error) {
      setModalContent('Task does not exist');
      setModalVisible(true);
    }finally{
      setIsLoading(false)
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
            <p>Task Name: {task.name}</p>
            <p>Task Date: {task.date}</p>
          </div>
        ) : (
          <div className="empty_div"></div>
        )}
        <form onSubmit={viewTask}>
          <label>
            ID:
            <input id="taskID" />
          </label>
          <button type="submit">View Task</button>
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

export default ViewTask;