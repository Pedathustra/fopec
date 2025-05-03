use fopec
go

 
if exists(select * from sys.procedures where name = 'getCompaniesByPersonID')
begin 
	drop proc getCompaniesByPersonID;
end 
go

create proc getCompaniesByPersonID
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