if exists(select name from sys.procedures where name = 'updPersonActive')
begin
	drop proc updPersonActive
end 
go 

create proc updPersonActive 
	@id int,
	@is_active bit
as
	set nocount on;
	update person 
	set  is_active = @is_active
	where id = @id 
	return 0

go



