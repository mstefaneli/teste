$(function() {
	$(document).on("click", "a#atv_list", function(){ getAtvList(this); });	
	$(document).on("click", "a#create_atv_form", function(){ getCreateForm(this); });	
	$(document).on("click", "button#add_atv", function(){ addAtv(this); });
	$(document).on("click", "a.delete_confirm", function(){ deleteConfirmation(this); });
	$(document).on("click", "button.delete", function(){ deleteAtv(this); });
	$(document).on("dblclick", "td.edit", function(){ makeEditable(this); });
	$(document).on("blur", "input#editbox", function(){ removeEditable(this) });
	$(document).on("change", "select#editbox", function(){ removeEditable(this) });

	$(document).on("change", "select#filtro_status", function(){ getAtvListFiltro(this) });
	$(document).on("change", "select#filtro_situacao", function(){ getAtvListFiltro(this) });

});

function removeEditable(element) { 
	
	$('#indicator').show();
	

	var Atv = new Object();
	Atv.id = $('.current').attr('atv_id');		
	Atv.field = $('.current').attr('field');
	Atv.newvalue = $(element).val();
	
	var atvJson = JSON.stringify(Atv);

	$.post('Controller.php',
		{
			action: 'update_field_data',			
			atv: atvJson
		},
		function(data, textStatus) {
			if( $('.current').attr('field') == 'status_id' ){

				$('td.current').html( $(element).children(':selected').text() );

				cor_fundo = $(element).children(':selected').attr('cor_fundo');

				$('tr.'+Atv.id).attr('style', 'background-color: '+ cor_fundo );

				if( Atv.newvalue == 4 ){ // Concluido
					getAtvList(element);
				}
			}
			else{
				$('td.current').html($(element).val());
			}
			
			$('.current').removeClass('current');
			$('#indicator').hide();			
		}, 
		"json"		
	);	
}

function makeEditable(element) { 

	if( $(element).attr('field') == 'status_id' ){

		$.post('Controller.php',
			{
				action: 'get_status'				
			},
			function(data, textStatus) {
				
				form =	'<select id="editbox" name="status_id">';
				atv_id = $(element).attr('atv_id');

				form += '<option value=""><-- Selecione -->></option>';

				$.each( data, function( index, st){      
					form += '<option field="status_id" atv_id="' + atv_id + '" cor_fundo="'+st.cor_fundo+'" value="'+st.id+'">'+st.descricao+'</option>';
					
			    });
			
				form += '</select>';
				
				$(element).html(form);
				$(element).addClass('current'); 

			}, 
			"json"		
		);
	}
	else{
		$(element).html('<input id="editbox" size="'+  $(element).text().length +'" type="text" value="'+ $(element).text() +'">');  
		$('#editbox').focus();
		$(element).addClass('current'); 
	}
	
}

function deleteConfirmation(element) {	
	$("#delete_confirm_modal").modal("show");
	$("#delete_confirm_modal input#atv_id").val($(element).attr('atv_id'));
}

function deleteAtv(element) {	
	
	var Atv = new Object();
	Atv.id = $("#delete_confirm_modal input#atv_id").val();
	
	var atvJson = JSON.stringify(Atv);
	
	$.post('Controller.php',
		{
			action: 'delete_atv',
			atv: atvJson
		},
		function(data, textStatus) {
			getAtvList(element);
			$("#delete_confirm_modal").modal("hide");
		}, 
		"json"		
	);	
}

function getAtvList(element) {
	
	$('#indicator').show();
	
	$.post('Controller.php',
		{
			action: 'get_atvs'				
		},
		function(data, textStatus) {
			renderAtvList(data);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

function getAtvListFiltro(element) {
	
	$('#indicator').show();

	var Atv = new Object();
	Atv.field = $(element).attr('field');
	Atv.value = $(element).val();
	
	var atvJson = JSON.stringify(Atv);

	$.post('Controller.php',
		{
			action: 'get_atvs_filter',
			atv: atvJson		
		},
		function(data, textStatus) {
			renderAtvList(data);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

function renderAtvList(jsonData) {
	
	$.post('Controller.php',
		{
			action: 'get_status'				
		},
		function(data, textStatus) {
			status  = '<select id="filtro_status" field="status_id">';
			status += '<option value=""><<-- Filtro Status -->></option>';
			$.each( data, function( index, st){     
				
				status += '<option value="'+st.id+'">'+st.descricao+'</option>';
				
		    });
		    status += '</select>';

		    status += ' <select id="filtro_situacao" field="situacao">';
			status += '<option value=""><<-- Filtro Situação -->></option>';
			status += '<option value="Ativo">Ativo</option>';
			status += '<option value="Inativo">Inativo</option>';
		    status += '</select>';

		    var table = status + '<br><br><table width="600" cellpadding="5" class="table table-hover table-bordered"><thead><tr><th scope="col">Nome</th><th scope="col">Descrição</th><th scope="col">Data Início</th><th scope="col">Data Fim</th><th scope="col">Status</th><th scope="col">Situação</th></tr></thead><tbody>';

			$.each( jsonData, function( index, atv){
				edit = 'edit';
				if( atv.status_id == 4 ){ // Caso concluido não permite alteração
					edit = '';
				} 

				dt_fim = atv.dt_fim;
				if( atv.dt_fim == null){
					dt_fim = '';
				}

				table += '<tr style="background-color: '+atv.cor_fundo+'" class="'+atv.id+'">';
				table += '<td class="'+edit+'" field="nome" atv_id="'+atv.id+'">'+atv.nome+'</td>';
				table += '<td class="'+edit+'" field="descricao" atv_id="'+atv.id+'">'+atv.descricao+'</td>';
				table += '<td class="'+edit+'" field="dt_inicio" atv_id="'+atv.id+'">'+atv.dt_inicio+'</td>';
				table += '<td class="" field="dt_fim" atv_id="'+atv.id+'">'+dt_fim+'</td>';
				table += '<td class="'+edit+'" field="status_id" atv_id="'+atv.id+'">'+atv.descricao_status+'</td>';
				table += '<td class="" field="situacao" atv_id="'+atv.id+'">'+atv.situacao+'</td>';
				//table += '<td><a href="javascript:void(0);" atv_id="'+atv.id+'" class="delete_confirm btn btn-danger"><i class="icon-remove icon-white"></i></a></td>';
				table += '</tr>';
		    });
			
			table += '</tbody></table>';
			table += '(Duplo clique para editar e alterar o valor do campo)';
			
			$('div#content').html(table);
		}, 
		"json"		
	);

	
}

function addAtv(element) {	
	
	$('#indicator').show();
	
	var Atv = new Object();
	Atv.nome = $('input#nome').val();
	Atv.descricao = $('textarea#descricao').val();
	Atv.dt_inicio = $('input#dt_inicio').val();
	Atv.status_id = $('select#status_id').val();
	
	var atvJson = JSON.stringify(Atv);

	$.post('Controller.php',
		{
			action: 'add_atv',
			atv: atvJson
		},
		function(data, textStatus) {
			getAtvList(element);
			$('#indicator').hide();
		}, 
		"json"		
	);
}

function getCreateForm(element) {
	var form = '<div class="input-prepend">';
		form +=	'<span class="add-on"><i class="icon-user icon-black"></i> Nome</span>';
		form +=	'<input type="text" id="nome" name="nome" value="" class="input-xlarge" />';		
		form +=	'</div><br/><br/>';

		form +=	'<div class="input-prepend">';
		form +=	'<span class="add-on add-on-area"><i class="icon-pencil icon-black"></i> Descrição</span>';
		form +=	'<textarea row="5" id="descricao" name="descricao" class="input-xlarge"></textarea>';
		form +=	'</div><br/><br/>';
				
		form +=	'<div class="input-prepend">';
		form +=	'<span class="add-on"><i class="icon-calendar icon-black"></i> Data Início</span>';
		form +=	'<input type="date" id="dt_inicio" name="dt_inicio" value="" class="input-xlarge" />';
		form +=	'</div><br/><br/>';
				
		form +=	'<div class="input-prepend">';
		form +=	'<span class="add-on"><i class="icon-tag icon-black"></i> Status</span>';
		form +=	'<select id="status_id" name="status_id" class="input-xlarge">';

		$.post('Controller.php',
			{
				action: 'get_status'				
			},
			function(data, textStatus) {

				$.each( data, function( index, st){      
					form += '<option value="'+st.id+'">'+st.descricao+'</option>';
					
			    });
			
				form += '</select>';
				form +=	'</div><br/><br/>';

				form +=	'<div class="control-group">';
				form +=	'<div class="">';		
				form +=	'<button type="button" id="add_atv" class="btn btn-primary"><i class="icon-ok icon-white"></i> Salvar</button>';
				form +=	'</div>';
				form +=	'</div>';
				
				$('div#content').html(form);

			}, 
			"json"		
		);

		
}