"""empty message

Revision ID: 7c2a8bdbe925
Revises: 
Create Date: 2019-02-12 13:43:52.735387

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7c2a8bdbe925'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('application_season',
    sa.Column('application_season_id', sa.Integer(), nullable=False),
    sa.Column('starttime', sa.DateTime(), nullable=True),
    sa.Column('endtime', sa.DateTime(), nullable=False),
    sa.Column('applicationperiodstart', sa.DateTime(), nullable=True),
    sa.Column('applicationperiodend', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('application_season_id')
    )
    op.create_table('showcase_table',
    sa.Column('student_id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('student_id')
    )
    op.create_table('users',
    sa.Column('userid', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=30), nullable=True),
    sa.PrimaryKeyConstraint('userid'),
    sa.UniqueConstraint('username')
    )
    op.create_table('application',
    sa.Column('application_id', sa.Integer(), nullable=False),
    sa.Column('info_text', sa.String(), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=False),
    sa.Column('comments', sa.String(length=100), nullable=True),
    sa.Column('userid', sa.Integer(), nullable=True),
    sa.Column('applies_with', sa.String(length=50), nullable=True),
    sa.Column('partnerApplicationId', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['partnerApplicationId'], ['application.application_id'], ),
    sa.ForeignKeyConstraint(['userid'], ['users.userid'], ),
    sa.PrimaryKeyConstraint('application_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('application')
    op.drop_table('users')
    op.drop_table('showcase_table')
    op.drop_table('application_season')
    # ### end Alembic commands ###