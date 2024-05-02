import { FC, useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { BallTriangle } from 'react-loader-spinner'


interface Task {
  id: string;
  taskId: string;
  name: string;
  date: string;
}

const ViewAllTasks: FC = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [isLoading,setIsLoading]=useState<boolean>(false);


  useEffect(() => {
    const allTasks = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('http://localhost:3000/api/ethereum/view-all-task', {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        });
        const data = await res.json();
        if (data.status === 200) {
          console.log(data.taskList);
          setTaskList(data.taskList);
        }
      } catch (error) {
        console.error(error);
      }finally{
        setIsLoading(false);

      }
    };
    allTasks();
  }, []);

  return (
    <>
      <Navigation />
      <div className="view_all_tasks">
        {taskList.map((task) => {
          return (
            
            <div
              className="view_all_tasks_card"
              key={task.id}
              style={task.id !== '' && task.name !== '' && task.date !== '' ? {} : { display: 'none' }}
            >
              <p>{task.taskId}</p>
              <p>{task.name}</p>
              <p>{task.date}</p>

              
            </div>
          );
        })}

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
      </div>
    </>
  );
};

export default ViewAllTasks;