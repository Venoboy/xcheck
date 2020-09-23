import { Action } from 'redux';
import { AUTH_GITHUB_SUCCESS, STOP_LOADING, REQUESTS } from '../Actions/actionTypes';

type stateType = {
  loaded: boolean;
  user: User;
  testUser: User;
  testTaskId: string;
  testCheckSessionId: string;
  testReviewId: string;
  testDisputeId: string;
  testTaskScoreId: string;
};

export enum UserRoles {
  Author = 'author',
  Student = 'student',
  Supervisor = 'supervisor',
  CourseManager = 'course_manager',
}

export enum TaskStates {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export type User = {
  githubId: string | null | number;
  role: UserRoles[];
  userName: string | null;
};

export type TaskItem = {
  id: string;
  minScore: number;
  maxScore: number;
  category: string;
  title: string;
  description: string;
};

export type Task = {
  id: string;
  author: string;
  state: TaskStates;
  categoriesOrder: string[];
  items: TaskItem[];
};

export type TaskScoreItem = {
  score: number;
  comment: string;
};

export type TaskScore = {
  task: string;
  items: {
    [index: string]: TaskScoreItem;
  };
};

export enum CrossCheckSessionStates {
  DRAFT = 'DRAFT',
  REQUESTS_GATHERING = 'REQUESTS_GATHERING',
  CROSS_CHECK = 'CROSS_CHECK',
  COMPLETED = 'COMPLETED',
}

export type Attendee = {
  githubId: string;
  reviewerOf: string[];
};

export type CrossCheckSession = {
  id: string;
  state: CrossCheckSessionStates;
  taskId: string;
  coefficient: number;
  startDate: string;
  endDate: string;
  discardMinScore: boolean;
  discardMaxScore: boolean;
  minReviewsAmount: number;
  desiredReviewersAmount: number;
  attendees: Attendee[];
};

export enum ReviewRequestStates {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  COMPLETED = 'COMPLETED',
}

export type ReviewRequest = {
  id: string;
  crossCheckSessionId: string;
  author: string;
  task: string;
  state: ReviewRequestStates;
  selfGrade: TaskScore;
};

export enum ReviewStates {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  DISPUTED = 'DISPUTED',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type Review = {
  id: string;
  requestId: string;
  author: string;
  state: ReviewStates;
  grade: TaskScore;
};

export enum DisputeStates {
  ONGOING = 'ONGOING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export type Dispute = {
  reviewId: string;
  state: DisputeStates;
  idem: string;
  comment: string;
  suggestedScore: number;
};

export type AuthSuccessAction = Action & { user: User };

const initialState: stateType = {
  loaded: false,
  user: {
    userName: null,
    githubId: null,
    role: [UserRoles.Student],
  },
  testUser: {
    userName: 'alex',
    githubId: 11111,
    role: [UserRoles.Student, UserRoles.Author, UserRoles.Supervisor],
  },
  testTaskId: '-MHYG_Mmt_L2D5QLQtep',
  testCheckSessionId: 'rss2020Q3react-xcheck',
  testReviewId: '-MHcD-pT20-yloyBYANX',
  testDisputeId: '-MHpfV9SG3s-mXj14Ba5',
  testTaskScoreId: '-MHl3FwbPLf_tCzl3dFn',
};

const reducer = (state = initialState, action: Action | AuthSuccessAction) => {
  const { user } = action as AuthSuccessAction;
  switch (action.type) {
    case REQUESTS:
      return {
        ...state,
        loaded: true,
      };
    case AUTH_GITHUB_SUCCESS:
      return {
        ...state,
        user,
      };
    case STOP_LOADING:
      return {
        ...state,
        loaded: false,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
