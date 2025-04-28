if exists(select * from sys.triggers where name = 'trg_insteadOfDelete_person')
begin
	drop trigger trg_insteadOfDelete_person;
end
go

create trigger trg_insteadOfDelete_person
on person
instead of delete
as
begin
    set nocount on;

	if (select count(id) from deleted) = 1
	begin 
		delete from person
		where id in (select id from deleted);
	end else begin
    
		declare @id int = (select id from deleted);

		update company
		set person_id_created = 0
		where person_id_created = @id;

		update crowdsourced_research_vote
		set person_id = 0
		where person_id = @id;

		update crowdsourced_research
		set observing_person_id = 0
		where observing_person_id = @id;

		
		exec updPersonAudit @id = @id 

		delete from person
		where id in (select id from deleted);
	end
end
go