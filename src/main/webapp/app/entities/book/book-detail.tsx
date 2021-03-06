import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './book.reducer';
import { IBook } from 'app/shared/model/book.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IBookDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BookDetail extends React.Component<IBookDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { bookEntity, isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="bookmanagerrmh2App.book.detail.title">Book</Translate> [<b>{bookEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="bookmanagerrmh2App.book.title">Title</Translate>
              </span>
            </dt>
            <dd>{bookEntity.title}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="bookmanagerrmh2App.book.description">Description</Translate>
              </span>
            </dt>
            <dd>{bookEntity.description}</dd>
            <dt>
              <span id="publicationDate">
                <Translate contentKey="bookmanagerrmh2App.book.publicationDate">Publication Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={bookEntity.publicationDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="price">
                <Translate contentKey="bookmanagerrmh2App.book.price">Price</Translate>
              </span>
            </dt>
            <dd>{bookEntity.price}</dd>
            <dt>
              <span id="bookCover">
                <Translate contentKey="bookmanagerrmh2App.book.bookCover">Book Cover</Translate>
              </span>
            </dt>
            <dd>{bookEntity.bookCover}</dd>
            <dt>
              <span id="genre">
                <Translate contentKey="bookmanagerrmh2App.book.genre">Genre</Translate>
              </span>
            </dt>
            <dd>{bookEntity.genre}</dd>
            <dt>
              <span id="isBestSeller">
                <Translate contentKey="bookmanagerrmh2App.book.isBestSeller">Is Best Seller</Translate>
              </span>
            </dt>
            <dd>{bookEntity.isBestSeller ? 'true' : 'false'}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="bookmanagerrmh2App.book.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {bookEntity.image ? (
                <div>
                  <a onClick={openFile(bookEntity.imageContentType, bookEntity.image)}>
                    <img src={`data:${bookEntity.imageContentType};base64,${bookEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {bookEntity.imageContentType}, {byteSize(bookEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
            <td>
              <Link to={`/entity/comment/book/${bookEntity.id}`}>
                <Translate contentKey="bookmanagerrmh2App.book.commentsOf">Comments of </Translate> {bookEntity.title}
              </Link>
            </td>
            <dt>
              <Translate contentKey="bookmanagerrmh2App.book.author">Author</Translate>
            </dt>
            <dd>{bookEntity.author ? bookEntity.author.name : ''}</dd>
            <dt>
              <Translate contentKey="bookmanagerrmh2App.book.publisher">Publisher</Translate>
            </dt>
            <dd>{bookEntity.publisher ? bookEntity.publisher.name : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/book" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/book/${bookEntity.id}/edit`} replace color="primary">
              <FontAwesomeIcon icon="pencil-alt" />{' '}
              <span className="d-none d-md-inline">
                <Translate contentKey="entity.action.edit">Edit</Translate>
              </span>
            </Button>
          )}
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ book, authentication }: IRootState) => ({
  bookEntity: book.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookDetail);
