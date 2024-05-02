/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, SyntheticEvent } from 'react';
import Navigation from '../components/Navigation';
import { BallTriangle } from 'react-loader-spinner'

interface CreateTaskProps {
  state: {
    contract: any;
    account: string;
  };
}

const CreateTask: FC<CreateTaskProps> = ({ state }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<string>('');
  const [isLoading,setIsLoading]=useState<boolean>(false);

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  const createTask = async (event: SyntheticEvent) => {
    event.preventDefault();
    const { contract, account } = state;
    const taskName = (document.querySelector('#taskName') as HTMLInputElement).value;
    const taskDate = (document.querySelector('#taskDate') as HTMLInputElement).value;
    try {
      const res = await fetch('http://localhost:3000/api/ethereum/create-task', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ taskDate: taskDate }),
      });
      console.log(account);
      const data = await res.json();
      if (data.status === 200) {
        if (contract && contract.methods) {
          setIsLoading(true)
          await contract.methods.createTask(taskName, taskDate).send({ from: account });
          setModalContent(`Task ${taskName} added at ${taskDate}`);
          setIsLoading(false)
        }
      } else {
        throw new Error('Task cannot be added');
      }
    } catch (error) {
      console.log(error);
      
      setModalContent(`Task already exists at ${taskDate}`);
    } finally {
      setModalOpen(true);
      setIsLoading(false)

    }
  };

  return (
    <>
      <Navigation />
      <div className="create_task todo_btn">
        <form onSubmit={createTask}>
          <label>
            Name:
            <input id="taskName" />
          </label>
          <label>
            Date:
            <input id="taskDate" type="date" />
          </label>
          <button type="submit">Create Task</button>
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
       
              
        {modalOpen && (
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

export default CreateTask;