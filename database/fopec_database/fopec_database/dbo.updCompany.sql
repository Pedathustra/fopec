use fopec
go

 
if exists(select * from sys.procedures where name = 'updCompany')
begin 
	drop proc updCompany;
end 
go

create proc updCompany 
	@id int,
	@name varchar(255),
	@person_id int
as
begin
	set nocount on;

	if not exists (select 1 from company where person_id_created = @person_id)
	begin 
		return -1
	end


	update company
	set name = @name
	where id = @id 
	return 0;
end 
go 

-- exec updCompany;