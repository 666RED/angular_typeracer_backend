import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Init1758881783543 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //@ Create user table
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'is_guest',
            type: 'boolean',
            isNullable: false,
          },
          {
            name: 'room_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'last_active',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'refresh_token',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true
    );

    //@ Create quote table
    await queryRunner.createTable(
      new Table({
        name: 'quote',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'text',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total_characters',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'length',
            type: 'enum',
            enum: ['short', 'medium', 'long'],
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true
    );

    //@ Create race result table
    await queryRunner.createTable(
      new Table({
        name: 'race_result',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'wpm',
            type: 'decimal',
            precision: 4,
            scale: 1,
            isNullable: false,
          },
          {
            name: 'place',
            type: 'enum',
            enum: ['1st', '2nd', '3rd', '4th', '5th', 'NC'],
            isNullable: false,
          },
          {
            name: 'total_players',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'accuracy_percentage',
            type: 'decimal',
            precision: 5,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'quote_id',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true
    );

    //@ Add user_id foreign key to race result table
    await queryRunner.createForeignKey(
      'race_result',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'user',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );

    //@ Add quote_id foreign key to race result table
    await queryRunner.createForeignKey(
      'race_result',
      new TableForeignKey({
        columnNames: ['quote_id'],
        referencedTableName: 'quote',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('quote');
    await queryRunner.dropTable('race_result');
  }
}
