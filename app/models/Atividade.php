<?php

require_once('core/Model.php');

class Atividade extends \core\Model{
	
	private $dbh;
	
	public function __construct(){
		$this->dbh = static::getDB();
	}

	public function getAtvs(){				
		$sth = $this->dbh->prepare("SELECT 
									  atv.id,
									  atv.nome,
									  atv.descricao,
									  DATE_FORMAT(atv.dt_inicio, '%d/%m/%Y') as dt_inicio,
									  DATE_FORMAT(atv.dt_fim, '%d/%m/%Y') as dt_fim,
									  atv.status_id,
									  atv.situacao,
									  st.descricao as descricao_status,
									  st.cor_fundo
									FROM 
									  duosys_atividade as atv
									INNER JOIN duosys_status as st
									  ON st.id = atv.status_id
									ORDER BY
									  atv.dt_inicio DESC");
		$sth->execute();
		return json_encode($sth->fetchAll());
	}

	public function add($atv){		
		$sth = $this->dbh->prepare("INSERT INTO duosys_atividade(nome, descricao, dt_inicio, status_id, situacao) VALUES (?, ?, ?, ?, ?)");
		$sth->execute(array($atv->nome, $atv->descricao, $atv->dt_inicio, $atv->status_id, 1));		
		return json_encode($this->dbh->lastInsertId());
	}
	
	public function delete($atv){				
		$sth = $this->dbh->prepare("DELETE FROM duosys_atividade WHERE id=?");
		$sth->execute(array($atv->id));
		return json_encode(1);
	}
	
	public function updateValue($atv){		
		$sth = $this->dbh->prepare("UPDATE duosys_atividade SET ". $atv->field ."=? WHERE id=?");
		$sth->execute(array($atv->newvalue, $atv->id));				
		return json_encode(1);	
	}

	public function getStatus(){
		
		$sth = $this->dbh->prepare("SELECT * FROM duosys_status");

		$sth->execute();
		return json_encode($sth->fetchAll());
	}

	public function getAtvsFilter($atv){		
		$sth = $this->dbh->prepare("SELECT 
									  atv.id,
									  atv.nome,
									  atv.descricao,
									  DATE_FORMAT(atv.dt_inicio, '%d/%m/%Y') as dt_inicio,
									  DATE_FORMAT(atv.dt_fim, '%d/%m/%Y') as dt_fim,
									  atv.status_id,
									  atv.situacao,
									  st.descricao as descricao_status,
									  st.cor_fundo
									FROM 
									  duosys_atividade as atv
									INNER JOIN duosys_status as st
									  ON st.id = atv.status_id
									WHERE
										atv." . $atv->field . " = '" . $atv->value . "'
									ORDER BY
									  atv.dt_inicio DESC");
		$sth->execute();
		return json_encode($sth->fetchAll());	
	}
}
?>