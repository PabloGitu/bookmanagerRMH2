import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './publisher.reducer';
import { IPublisher } from 'app/shared/model/publisher.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface IPublisherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PublisherDetail extends React.Component<IPublisherDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { publisherEntity, isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="bookmanagerrmh2App.publisher.detail.title">Publisher</Translate> [<b>{publisherEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">
                <Translate contentKey="bookmanagerrmh2App.publisher.name">Name</Translate>
              </span>
            </dt>
            <dd>{publisherEntity.name}</dd>
            <dt>
              <span id="distribution">
                <Translate contentKey="bookmanagerrmh2App.publisher.distribution">Distribution</Translate>
              </span>
            </dt>
            <dd>{publisherEntity.distribution}</dd>
            <dt>
              <span id="localization">
                <Translate contentKey="bookmanagerrmh2App.publisher.localization">Localization</Translate>
              </span>
            </dt>
            <dd>{publisherEntity.localization}</dd>
            <td>
              <Link to={`/entity/book/publisher/${publisherEntity.id}`}>Books of {publisherEntity.name}</Link>
            </td>
          </dl>
          <Button tag={Link} to="/entity/publisher" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          {isAdmin && (
            <Button tag={Link} to={`/entity/publisher/${publisherEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ publisher, authentication }: IRootState) => ({
  publisherEntity: publisher.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublisherDetail);
