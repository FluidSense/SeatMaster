"""empty message

Revision ID: 5c4f57347eb2
Revises: 9eea19c03d62
Create Date: 2019-03-15 12:09:27.468971

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5c4f57347eb2'
down_revision = '9eea19c03d62'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('application', sa.Column('needs', sa.String(), nullable=False))
    op.drop_column('application', 'info_text')
    op.add_column('users', sa.Column('email', sa.String(length=30), nullable=True))
    op.add_column('users', sa.Column('sub', sa.String(), nullable=True))
    op.create_unique_constraint(None, 'users', ['sub'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'users', type_='unique')
    op.drop_column('users', 'sub')
    op.drop_column('users', 'email')
    op.add_column('application', sa.Column('info_text', sa.VARCHAR(), autoincrement=False, nullable=False))
    op.drop_column('application', 'needs')
    # ### end Alembic commands ###
