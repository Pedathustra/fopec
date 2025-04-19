use fopec
go

 
if exists(select * from sys.procedures where name = 'updCompany')
begin 
	drop proc updCompany;
end 
go

create proc updCompany 
	@id int,
	@name varchar(255)
as
begin
	set nocount on;
	update company
	set name = @name
	where id = @id 

end 
go 

-- exec updCompany;