CREATE TABLE `duosys_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(30) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL,
  `dt_cadastro` date NOT NULL,
  `cor_fundo` varchar(20) CHARACTER SET latin1 COLLATE latin1_general_ci NOT NULL DEFAULT '#FFFFFF',
  `situacao` enum('Ativo','Inativo') NOT NULL DEFAULT 'Ativo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

insert into `duosys_status`(`id`,`descricao`,`dt_cadastro`,`cor_fundo`,`situacao`) values (1,'Pendente','2018-05-29 00:00:00','#ffffff','Ativo');
insert into `duosys_status`(`id`,`descricao`,`dt_cadastro`,`cor_fundo`,`situacao`) values (2,'Em Desenvolvimento','2018-05-29 00:00:00','#ffffff','Ativo');
insert into `duosys_status`(`id`,`descricao`,`dt_cadastro`,`cor_fundo`,`situacao`) values (3,'Em Teste','2018-05-29 00:00:00','#ffffff','Ativo');
insert into `duosys_status`(`id`,`descricao`,`dt_cadastro`,`cor_fundo`,`situacao`) values (4,'Concluido','2018-05-29 00:00:00','#c3ffba','Ativo');






CREATE TABLE `duosys_atividade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) CHARACTER SET latin1 NOT NULL,
  `descricao` varchar(600) CHARACTER SET latin1 NOT NULL,
  `dt_inicio` date NOT NULL,
  `dt_fim` date DEFAULT NULL,
  `status_id` int(11) NOT NULL DEFAULT '1',
  `situacao` enum('Ativo','Inativo') NOT NULL DEFAULT 'Ativo',
  PRIMARY KEY (`id`),
  KEY `FK_status` (`status_id`),
  CONSTRAINT `FK_status` FOREIGN KEY (`status_id`) REFERENCES `duosys_status` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8;


insert into `duosys_atividade`(`id`,`nome`,`descricao`,`dt_inicio`,`dt_fim`,`status_id`,`situacao`) values (1,'Atv 1','Descricao Atv 1','2018-05-29 00:00:00',null,1,'Ativo');
insert into `duosys_atividade`(`id`,`nome`,`descricao`,`dt_inicio`,`dt_fim`,`status_id`,`situacao`) values (2,'Atv 2','Descr Atv 2','2018-05-14 00:00:00','2018-05-30 00:00:00',4,'Ativo');
insert into `duosys_atividade`(`id`,`nome`,`descricao`,`dt_inicio`,`dt_fim`,`status_id`,`situacao`) values (3,'Atv 3','Atividade 3','2018-05-23 00:00:00',null,1,'Ativo');
insert into `duosys_atividade`(`id`,`nome`,`descricao`,`dt_inicio`,`dt_fim`,`status_id`,`situacao`) values (42,'Atv 5','Esta atividade consiste em...','2018-05-30 00:00:00','2018-05-30 00:00:00',4,'Ativo');
insert into `duosys_atividade`(`id`,`nome`,`descricao`,`dt_inicio`,`dt_fim`,`status_id`,`situacao`) values (43,'Atividade 6','Ajuste de campo...','2018-05-17 00:00:00',null,3,'Ativo');
insert into `duosys_atividade`(`id`,`nome`,`descricao`,`dt_inicio`,`dt_fim`,`status_id`,`situacao`) values (44,'Atividade 7','Correcao de erro no sistema...','2018-05-04 00:00:00','2018-05-30 00:00:00',4,'Ativo');
insert into `duosys_atividade`(`id`,`nome`,`descricao`,`dt_inicio`,`dt_fim`,`status_id`,`situacao`) values (45,'Atividade teste','Atividade teste 123','2018-05-30 00:00:00',null,1,'Ativo');
insert into `duosys_atividade`(`id`,`nome`,`descricao`,`dt_inicio`,`dt_fim`,`status_id`,`situacao`) values (46,'Atv 222','Descrição atv 2222','2018-05-30 00:00:00',null,1,'Ativo');


CREATE TRIGGER `upd_dt_fim` BEFORE UPDATE ON duosys_atividade 
FOR EACH ROW
BEGIN
    IF NEW.status_id = 4 THEN
      SET NEW.dt_fim = CURRENT_TIME;
    END IF;
END;