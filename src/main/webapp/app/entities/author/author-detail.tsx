import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './author.reducer';
import { IAuthor } from 'app/shared/model/author.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IAuthorDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AuthorDetail extends React.Component<IAuthorDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { authorEntity, isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="bookmanagerrmh2App.author.detail.title">Author</Translate> [<b>{authorEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="bookmanagerrmh2App.author.name">Name</Translate>
              </span>
            </dt>
            <dd>{authorEntity.name}</dd>
            <dt>
              <span id="genre">
                <Translate contentKey="bookmanagerrmh2App.author.genre">Genre</Translate>
              </span>
            </dt>
            <dd>{authorEntity.genre}</dd>
            <td>
              <Link to={`/entity/book/author/${authorEntity.id}`}>
                <Translate contentKey="bookmanagerrmh2App.author.booksOf">Books of </Translate> {authorEntity.name}
              </Link>
            </td>
            <dt>
              <span id="birthdate">
                <Translate contentKey="bookmanagerrmh2App.author.birthdate">Birthdate</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={authorEntity.birthdate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="deathDate">
                <Translate contentKey="bookmanagerrmh2App.author.deathDate">Death Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={authorEntity.deathDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="country">
                <Translate contentKey="bookmanagerrmh2App.author.country">Country</Translate>
              </span>
            </dt>
            <dd>{authorEntity.country}</dd>
            <dt>
              <span id="image">
                <Translate contentKey="bookmanagerrmh2App.author.image">Image</Translate>
              </span>
            </dt>
            <dd>
              {authorEntity.image ? (
                <div>
                  <a onClick={openFile(authorEntity.imageContentType, authorEntity.image)}>
                    <img src={`data:${authorEntity.imageContentType};base64,${authorEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                  <span>
                    {authorEntity.imageContentType}, {byteSize(authorEntity.image)}
                  </span>
                </div>
              ) : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/author" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/author/${authorEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ author, authentication }: IRootState) => ({
  authorEntity: author.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorDetail);
