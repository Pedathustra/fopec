use fopec
go

 
if exists(select * from sys.procedures where name = 'insCompany')
begin 
	drop proc insCompany;
end 
go

create proc insCompany 
			@name varchar(255),
			@person_id_created int
as
begin
	set nocount on;
	insert into company(
			[name],
			created,
			last_updated,
			person_id_created
		) 
	values (
			@name,
			getdate(),
			getdate(),
			@person_id_created
	)
	return 0
end 
go 

-- exec insCompany;