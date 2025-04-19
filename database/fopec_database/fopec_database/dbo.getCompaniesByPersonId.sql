use fopec
go

 
if exists(select * from sys.procedures where name = 'getCompanies')
begin 
	drop proc getCompanies;
end 
go

create proc getCompaniesByPersonCreatedID
	@person_id_created int
as
begin
	set nocount on;
	select	id
		,	name
		,	created
		,	last_updated
		,	person_id_created
	from company
	where person_id_created = @person_id_created;
	;
end 
go 

-- exec getCompanies;