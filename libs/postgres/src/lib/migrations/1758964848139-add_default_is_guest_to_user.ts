import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDefaultIsGuestToUser1758964848139
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user',
      'is_guest',
      new TableColumn({
        name: 'is_guest',
        type: 'boolean',
        isNullable: false,
        default: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'user',
      'is_guest',
      new TableColumn({
        name: 'is_guest',
        type: 'boolean',
        isNullable: false,
        default: undefined,
      })
    );
  }
}
