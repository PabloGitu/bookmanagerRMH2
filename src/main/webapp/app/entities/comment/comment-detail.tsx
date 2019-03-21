import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, AUTHORITIES } from 'app/config/constants';
import { hasAnyAuthority } from 'app/shared/auth/private-route';

export interface ICommentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CommentDetail extends React.Component<ICommentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { commentEntity, isAdmin } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="bookmanagerrmh2App.comment.detail.title">Comment</Translate> [<b>{commentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="userName">
                <Translate contentKey="bookmanagerrmh2App.comment.userName">User Name</Translate>
              </span>
            </dt>
            <dd>{commentEntity.userName}</dd>
            <dt>
              <span id="description">
                <Translate contentKey="bookmanagerrmh2App.comment.description">Description</Translate>
              </span>
            </dt>
            <dd>{commentEntity.description}</dd>
            <dt>
              <Translate contentKey="bookmanagerrmh2App.comment.book">Book</Translate>
            </dt>
            <dd>{commentEntity.book ? commentEntity.book.title : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/comment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/comment/${commentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ comment, authentication }: IRootState) => ({
  commentEntity: comment.entity,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDetail);
