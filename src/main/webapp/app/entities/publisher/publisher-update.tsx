import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './publisher.reducer';
import { IPublisher } from 'app/shared/model/publisher.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPublisherUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPublisherUpdateState {
  isNew: boolean;
}

export class PublisherUpdate extends React.Component<IPublisherUpdateProps, IPublisherUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { publisherEntity } = this.props;
      const entity = {
        ...publisherEntity,
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
    this.props.history.push('/entity/publisher');
  };

  render() {
    const { publisherEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="bookmanagerrmh2App.publisher.home.createOrEditLabel">
              <Translate contentKey="bookmanagerrmh2App.publisher.home.createOrEditLabel">Create or edit a Publisher</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : publisherEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="publisher-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="name">
                    <Translate contentKey="bookmanagerrmh2App.publisher.name">Name</Translate>
                  </Label>
                  <AvField
                    id="publisher-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="distributionLabel">
                    <Translate contentKey="bookmanagerrmh2App.publisher.distribution">Distribution</Translate>
                  </Label>
                  <AvInput
                    id="publisher-distribution"
                    type="select"
                    className="form-control"
                    name="distribution"
                    value={(!isNew && publisherEntity.distribution) || 'WORLDWIDE'}
                  >
                    <option value="WORLDWIDE">
                      <Translate contentKey="bookmanagerrmh2App.Distribution.WORLDWIDE" />
                    </option>
                    <option value="REGIONAL">
                      <Translate contentKey="bookmanagerrmh2App.Distribution.REGIONAL" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="localizationLabel" for="localization">
                    <Translate contentKey="bookmanagerrmh2App.publisher.localization">Localization</Translate>
                  </Label>
                  <AvField id="publisher-localization" type="text" name="localization" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/publisher" replace color="info">
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
  publisherEntity: storeState.publisher.entity,
  loading: storeState.publisher.loading,
  updating: storeState.publisher.updating,
  updateSuccess: storeState.publisher.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PublisherUpdate);
