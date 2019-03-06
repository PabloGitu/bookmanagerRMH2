import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IAuthor } from 'app/shared/model/author.model';
import { getEntities as getAuthors } from 'app/entities/author/author.reducer';
import { IPublisher } from 'app/shared/model/publisher.model';
import { getEntities as getPublishers } from 'app/entities/publisher/publisher.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './book.reducer';
import { IBook } from 'app/shared/model/book.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBookUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBookUpdateState {
  isNew: boolean;
  authorId: string;
  publisherId: string;
}

export class BookUpdate extends React.Component<IBookUpdateProps, IBookUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      authorId: '0',
      publisherId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getAuthors();
    this.props.getPublishers();
  }

  onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => this.props.setBlob(name, data, contentType), isAnImage);
  };

  clearBlob = name => () => {
    this.props.setBlob(name, undefined, undefined);
  };

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { bookEntity } = this.props;
      const entity = {
        ...bookEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/book');
  };

  render() {
    const { bookEntity, authors, publishers, loading, updating } = this.props;
    const { isNew } = this.state;

    const { image, imageContentType } = bookEntity;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="bookmanagerrmh2App.book.home.createOrEditLabel">
              <Translate contentKey="bookmanagerrmh2App.book.home.createOrEditLabel">Create or edit a Book</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : bookEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="book-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="bookmanagerrmh2App.book.title">Title</Translate>
                  </Label>
                  <AvField
                    id="book-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="description">
                    <Translate contentKey="bookmanagerrmh2App.book.description">Description</Translate>
                  </Label>
                  <AvField
                    id="book-description"
                    type="text"
                    name="description"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      minLength: { value: 10, errorMessage: translate('entity.validation.minlength', { min: 10 }) }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="publicationDateLabel" for="publicationDate">
                    <Translate contentKey="bookmanagerrmh2App.book.publicationDate">Publication Date</Translate>
                  </Label>
                  <AvField
                    id="book-publicationDate"
                    type="date"
                    className="form-control"
                    name="publicationDate"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="priceLabel" for="price">
                    <Translate contentKey="bookmanagerrmh2App.book.price">Price</Translate>
                  </Label>
                  <AvField
                    id="book-price"
                    type="text"
                    name="price"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') },
                      number: { value: true, errorMessage: translate('entity.validation.number') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="bookCoverLabel">
                    <Translate contentKey="bookmanagerrmh2App.book.bookCover">Book Cover</Translate>
                  </Label>
                  <AvInput
                    id="book-bookCover"
                    type="select"
                    className="form-control"
                    name="bookCover"
                    value={(!isNew && bookEntity.bookCover) || 'SOFT'}
                  >
                    <option value="SOFT">
                      <Translate contentKey="bookmanagerrmh2App.BookCover.SOFT" />
                    </option>
                    <option value="HARD">
                      <Translate contentKey="bookmanagerrmh2App.BookCover.HARD" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="genreLabel">
                    <Translate contentKey="bookmanagerrmh2App.book.genre">Genre</Translate>
                  </Label>
                  <AvInput
                    id="book-genre"
                    type="select"
                    className="form-control"
                    name="genre"
                    value={(!isNew && bookEntity.genre) || 'THRILLER'}
                  >
                    <option value="THRILLER">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.THRILLER" />
                    </option>
                    <option value="ROMANTIC">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.ROMANTIC" />
                    </option>
                    <option value="ADVENTURE">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.ADVENTURE" />
                    </option>
                    <option value="SCARY">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.SCARY" />
                    </option>
                    <option value="SCIENCEFICTION">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.SCIENCEFICTION" />
                    </option>
                    <option value="CHILD">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.CHILD" />
                    </option>
                    <option value="POLICY">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.POLICY" />
                    </option>
                    <option value="SOCIETY">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.SOCIETY" />
                    </option>
                    <option value="OTHER">
                      <Translate contentKey="bookmanagerrmh2App.BookGenre.OTHER" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="isBestSellerLabel" check>
                    <AvInput id="book-isBestSeller" type="checkbox" className="form-control" name="isBestSeller" />
                    <Translate contentKey="bookmanagerrmh2App.book.isBestSeller">Is Best Seller</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <AvGroup>
                    <Label id="imageLabel" for="image">
                      <Translate contentKey="bookmanagerrmh2App.book.image">Image</Translate>
                    </Label>
                    <br />
                    {image ? (
                      <div>
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                        <br />
                        <Row>
                          <Col md="11">
                            <span>
                              {imageContentType}, {byteSize(image)}
                            </span>
                          </Col>
                          <Col md="1">
                            <Button color="danger" onClick={this.clearBlob('image')}>
                              <FontAwesomeIcon icon="times-circle" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <input id="file_image" type="file" onChange={this.onBlobChange(true, 'image')} accept="image/*" />
                    <AvInput type="hidden" name="image" value={image} />
                  </AvGroup>
                </AvGroup>
                <AvGroup>
                  <Label for="author.name">
                    <Translate contentKey="bookmanagerrmh2App.book.author">Author</Translate>
                  </Label>
                  <AvInput
                    id="book-author"
                    type="select"
                    className="form-control"
                    name="author.id"
                    value={isNew ? authors[0] && authors[0].id : bookEntity.author.id}
                  >
                    {authors
                      ? authors.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="publisher.name">
                    <Translate contentKey="bookmanagerrmh2App.book.publisher">Publisher</Translate>
                  </Label>
                  <AvInput
                    id="book-publisher"
                    type="select"
                    className="form-control"
                    name="publisher.id"
                    value={isNew ? publishers[0] && publishers[0].id : bookEntity.publisher.id}
                  >
                    {publishers
                      ? publishers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/book" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  authors: storeState.author.entities,
  publishers: storeState.publisher.entities,
  bookEntity: storeState.book.entity,
  loading: storeState.book.loading,
  updating: storeState.book.updating,
  updateSuccess: storeState.book.updateSuccess
});

const mapDispatchToProps = {
  getAuthors,
  getPublishers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BookUpdate);
