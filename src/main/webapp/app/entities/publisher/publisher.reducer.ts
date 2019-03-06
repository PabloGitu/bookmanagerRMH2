import axios from 'axios';
import {
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPublisher, defaultValue } from 'app/shared/model/publisher.model';

export const ACTION_TYPES = {
  FETCH_PUBLISHER_LIST: 'publisher/FETCH_PUBLISHER_LIST',
  FETCH_PUBLISHER: 'publisher/FETCH_PUBLISHER',
  CREATE_PUBLISHER: 'publisher/CREATE_PUBLISHER',
  UPDATE_PUBLISHER: 'publisher/UPDATE_PUBLISHER',
  DELETE_PUBLISHER: 'publisher/DELETE_PUBLISHER',
  RESET: 'publisher/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPublisher>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PublisherState = Readonly<typeof initialState>;

// Reducer

export default (state: PublisherState = initialState, action): PublisherState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PUBLISHER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PUBLISHER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PUBLISHER):
    case REQUEST(ACTION_TYPES.UPDATE_PUBLISHER):
    case REQUEST(ACTION_TYPES.DELETE_PUBLISHER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PUBLISHER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PUBLISHER):
    case FAILURE(ACTION_TYPES.CREATE_PUBLISHER):
    case FAILURE(ACTION_TYPES.UPDATE_PUBLISHER):
    case FAILURE(ACTION_TYPES.DELETE_PUBLISHER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PUBLISHER_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PUBLISHER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PUBLISHER):
    case SUCCESS(ACTION_TYPES.UPDATE_PUBLISHER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PUBLISHER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/publishers';

// Actions

export const getEntities: ICrudGetAllAction<IPublisher> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PUBLISHER_LIST,
    payload: axios.get<IPublisher>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPublisher> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PUBLISHER,
    payload: axios.get<IPublisher>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPublisher> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PUBLISHER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const updateEntity: ICrudPutAction<IPublisher> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PUBLISHER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPublisher> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PUBLISHER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
