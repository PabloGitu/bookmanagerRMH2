import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { openFile, byteSize, Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities, getEntitiesByAuthor, getEntitiesByPublisher, reset } from './book.reducer';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IBookProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string; url: string }> {}

export type IBookState = IPaginationBaseState;

export class Book extends React.Component<IBookProps, IBookState> {
  state: IBookState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  componentDidUpdate() {
    if (this.props.updateSuccess) {
      this.reset();
    }
  }

  reset = () => {
    this.props.reset();
    if (window.location.href.includes('author')) {
      this.setState({ activePage: 1 }, () => {
        this.getEntitiesByAuthor();
      });
    } else if (window.location.href.includes('publisher')) {
      this.setState({ activePage: 1 }, () => {
        this.getEntitiesByPublisher();
      });
    } else {
      this.setState({ activePage: 1 }, () => {
        this.getEntities();
      });
    }
  };

  handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
    }
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => {
        this.reset();
      }
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  getEntitiesByAuthor = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntitiesByAuthor(this.props.match.params.id, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  getEntitiesByPublisher = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntitiesByPublisher(this.props.match.params.id, activePage - 1, itemsPerPage, `${sort},${order}`);
  };
  render() {
    const { bookList, match, isAdmin } = this.props;
    return (
      <div>
        <h2 id="book-heading">
          <Translate contentKey="bookmanagerrmh2App.book.home.title">Books</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bookmanagerrmh2App.book.home.createLabel">Create new Book</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage - 1 < this.props.links.next}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('title')}>
                    <Translate contentKey="bookmanagerrmh2App.book.title">Title</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('publicationDate')}>
                    <Translate contentKey="bookmanagerrmh2App.book.publicationDate">Publication Date</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('price')}>
                    <Translate contentKey="bookmanagerrmh2App.book.price">Price</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('bookCover')}>
                    <Translate contentKey="bookmanagerrmh2App.book.bookCover">Book Cover</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('genre')}>
                    <Translate contentKey="bookmanagerrmh2App.book.genre">Genre</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('isBestSeller')}>
                    <Translate contentKey="bookmanagerrmh2App.book.isBestSeller">Is Best Seller</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('image')}>
                    <Translate contentKey="bookmanagerrmh2App.book.image">Image</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="bookmanagerrmh2App.book.author">Author</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="bookmanagerrmh2App.book.publisher">Publisher</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {bookList.map((book, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${book.id}`} color="link" size="sm">
                        {book.id}
                      </Button>
                    </td>
                    <td>{book.title}</td>
                    <td>
                      <TextFormat type="date" value={book.publicationDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{book.price}</td>
                    <td>
                      <Translate contentKey={`bookmanagerrmh2App.BookCover.${book.bookCover}`} />
                    </td>
                    <td>
                      <Translate contentKey={`bookmanagerrmh2App.BookGenre.${book.genre}`} />
                    </td>
                    <td>{book.isBestSeller ? 'true' : 'false'}</td>
                    <td>
                      {book.image ? (
                        <div>
                          <a onClick={openFile(book.imageContentType, book.image)}>
                            <img src={`data:${book.imageContentType};base64,${book.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                          <span>
                            {book.imageContentType}, {byteSize(book.image)}
                          </span>
                        </div>
                      ) : null}
                    </td>
                    <td>{book.author ? <Link to={`/entity/author/${book.author.id}`}>{book.author.name}</Link> : ''}</td>
                    <td>{book.publisher ? <Link to={`/entity/publisher/${book.publisher.id}`}>{book.publisher.name}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`/entity/book/${book.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        {isAdmin && (
                          <Button tag={Link} to={`/entity/book/${book.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                        )}
                        {isAdmin && (
                          <Button tag={Link} to={`/entity/book/${book.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ book, authentication }: IRootState) => ({
  bookList: book.entities,
  totalItems: book.totalItems,
  links: book.links,
  entity: book.entity,
  updateSuccess: book.updateSuccess,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = {
  getEntities,
  getEntitiesByAuthor,
  getEntitiesByPublisher,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Book);
