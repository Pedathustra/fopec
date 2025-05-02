if exists( select name from sys.procedures where name = 'delPersonAudit')
begin
	drop proc delPersonAudit
end
go

create proc delPersonAudit
		@person_id int
as 
	delete 
	from person_audit 
	where person_id = @person_id 
	;
	return 0;
go

 