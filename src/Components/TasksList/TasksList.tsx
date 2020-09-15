import * as React from 'react';
import { Table } from 'antd';
import { SortOrder } from 'antd/es/table/interface';
import { ReviewRequest, Task } from '../../Reducer/reducer';
import './TasksList.scss';

const reviewRequest = {
  id: 'rev-req-1',
  crossCheckSessionId: 'rss2020Q3react-xcheck',
  author: 'cardamo',
  task: 'simple-task-v1',
  state: 'PUBLISHED',
  selfGrade: {},
} as ReviewRequest;

const task = {
  id: 'simple-task-v1',
  author: 'cardamo',
  state: 'DRAFT',
  categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
  items: [
    {
      id: 'basic_p1',
      minScore: 0,
      maxScore: 20,
      category: 'Basic Scope',
      title: 'Basic things',
      description: 'You need to make things right, not wrong',
    },
    {
      id: 'extra_p1',
      minScore: 0,
      maxScore: 30,
      category: 'Extra Scope',
      title: 'More awesome things',
      description: 'Be creative and make up some more awesome things',
    },
    {
      id: 'fines_p1',
      minScore: -10,
      maxScore: 0,
      category: 'Fines',
      title: 'App crashes',
      description: 'App causes BSoD!',
    },
  ],
} as Task;

export type TasksListProps = {
  tasks?: Task[];
  reviewRequests?: ReviewRequest[];
};

type FilterValue = string | number | boolean;

export const TasksList: React.FC<TasksListProps> = ({
  tasks = [task],
  reviewRequests = [reviewRequest],
}) => {
  const tasksTableData = {
    columns: [
      {
        title: 'Author',
        dataIndex: 'author',
        filters: tasks.map(el => ({
          text: el.author,
          value: el.author,
        })),
        onFilter: (value: FilterValue, record: Task) => record.author.indexOf(String(value)) === 0,
        sorter: (a: Task, b: Task) => a.author.length - b.author.length,
        sortDirections: ['descend'] as SortOrder[],
      },
      {
        title: 'State',
        dataIndex: 'state',
        filters: tasks.map(el => ({
          text: el.state,
          value: el.state,
        })),
        onFilter: (value: FilterValue, record: Task) => record.state.indexOf(String(value)) === 0,
        sorter: (a: Task, b: Task) => a.state.length - b.state.length,
        sortDirections: ['descend'] as SortOrder[],
      },
    ],
    dataSource: tasks,
  };
  const reviewRequestsTableData = {
    columns: [
      {
        title: 'Author',
        dataIndex: 'author',
        filters: reviewRequests.map(request => ({
          text: request.author,
          value: request.author,
        })),
        onFilter: (value: FilterValue, record: ReviewRequest) =>
          record.author.indexOf(String(value)) === 0,
        sorter: (a: ReviewRequest, b: ReviewRequest) => a.author.length - b.author.length,
        sortDirections: ['descend'] as SortOrder[],
      },
      {
        title: 'Task',
        dataIndex: 'task',
        onFilter: (value: FilterValue, record: ReviewRequest) =>
          record.task.indexOf(String(value)) === 0,
        sorter: (a: ReviewRequest, b: ReviewRequest) => a.task.length - b.task.length,
        sortDirections: ['descend'] as SortOrder[],
      },
      {
        title: 'State',
        dataIndex: 'state',
        filters: reviewRequests.map(request => ({
          text: request.state,
          value: request.state,
        })),
        onFilter: (value: FilterValue, record: ReviewRequest) =>
          record.state.indexOf(String(value)) === 0,
        sorter: (a: ReviewRequest, b: ReviewRequest) => a.state.length - b.state.length,
        sortDirections: ['descend'] as SortOrder[],
      },
    ],
    dataSource: reviewRequests,
  };

  return (
    <div id="tasks-list">
      <h1>Tasks</h1>
      <Table {...tasksTableData} />

      <h1>Review requests</h1>
      <Table {...reviewRequestsTableData} />
    </div>
  );
};
