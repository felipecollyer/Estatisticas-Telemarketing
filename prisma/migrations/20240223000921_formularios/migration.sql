-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "formularios" (
    "id" SERIAL NOT NULL,
    "nome_formulario" VARCHAR(255) NOT NULL,
    "agendamento" VARCHAR(255) NOT NULL,
    "tipo_agendamento" VARCHAR(255) NOT NULL,
    "ciclo_agendamento" VARCHAR(255) NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "razao_social" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "formularios_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "formularios" ADD CONSTRAINT "formularios_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
